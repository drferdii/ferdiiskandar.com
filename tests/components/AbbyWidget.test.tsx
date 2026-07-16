import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AbbyWidget from '@/components/AbbyWidget'

const COLLAPSE_TIMEOUT = 2000

describe('AbbyWidget', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: vi.fn().mockResolvedValue(undefined),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders welcome state and opens chat', async () => {
    render(<AbbyWidget />)

    const launcher = await screen.findByRole('button', { name: /tanya abby/i }, { timeout: COLLAPSE_TIMEOUT })
    fireEvent.click(launcher)

    expect(await screen.findByText('Halo, saya Abby.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Siapa Ferdi?' })).toBeInTheDocument()
  })

  it('sends a chat message and renders assistant reply', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ reply: 'Respons Abby mock.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<AbbyWidget />)
    const launcher = await screen.findByRole('button', { name: /tanya abby/i }, { timeout: COLLAPSE_TIMEOUT })
    fireEvent.click(launcher)

    const starter = await screen.findByRole('button', { name: 'Siapa Ferdi?' })
    fireEvent.click(starter)

    await waitFor(() => expect(screen.getByText('Respons Abby mock.')).toBeInTheDocument())
    expect(fetch).toHaveBeenCalledWith('/api/abby', expect.objectContaining({ method: 'POST' }))
  })

  it('opens lead form for collaboration intent and submits idempotent payload', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ reply: 'Mari kita bahas kolaborasinya.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ reply: 'Tentu, silakan isi form inquiry singkat.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true, message: 'Inquiry diterima.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    render(<AbbyWidget />)
    const launcher = await screen.findByRole('button', { name: /tanya abby/i }, { timeout: COLLAPSE_TIMEOUT })
    fireEvent.click(launcher)

    const starter = await screen.findByRole('button', { name: 'Siapa Ferdi?' })
    fireEvent.click(starter)

    const input = await screen.findByLabelText(/pesan untuk abby/i)
    fireEvent.change(input, { target: { value: 'Saya ingin kolaborasi dengan dr Ferdi.' } })
    fireEvent.click(screen.getByRole('button', { name: /kirim pesan/i }))

    const nudge = await screen.findByRole('button', { name: /buka form inquiry/i })
    fireEvent.click(nudge)

    const nameInput = await screen.findByLabelText(/nama/i)
    fireEvent.change(nameInput, { target: { value: 'Chief Tester' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'chief@example.com' } })
    fireEvent.change(screen.getByLabelText(/pesan singkat/i), {
      target: { value: 'Saya ingin membahas kolaborasi strategis.' },
    })
    fireEvent.click(screen.getByLabelText(/saya setuju informasi ini digunakan/i))

    const submitButtons = await screen.findAllByRole('button', { name: /kirim inquiry/i })
    await waitFor(() => expect(submitButtons[0]).toBeEnabled())
    fireEvent.click(submitButtons[0])

    await waitFor(() => expect(screen.getByText('Inquiry diterima.')).toBeInTheDocument())
    const leadCall = vi.mocked(fetch).mock.calls[2]
    expect(leadCall?.[0]).toBe('/api/abby/lead')
    const body = JSON.parse(String((leadCall?.[1] as RequestInit).body)) as Record<string, unknown>
    expect(body.idempotencyKey).toBeTruthy()
    expect(body.formStartedAt).toBeTypeOf('number')
    expect(body.website).toBe('')
  })
}, 30000)
