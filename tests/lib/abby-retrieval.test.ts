import { buildAbbyKnowledgeContext } from '@/lib/abby-knowledge'

describe('Abby selective retrieval', () => {
  it('always includes truth registry and conversation style without loading the full disease corpus', () => {
    const result = buildAbbyKnowledgeContext({ message: 'Siapa dr Ferdi Iskandar?' })

    expect(result.metadata.selectedDocumentIds).toContain('truth_registry')
    expect(result.metadata.selectedDocumentIds).toContain('conversation_style')
    expect(result.context).not.toContain('DIS-159')
  })

  it('selects speaking content for speaking intent deterministically', () => {
    const first = buildAbbyKnowledgeContext({ message: 'Saya ingin mengundang dr Ferdi sebagai narasumber seminar AI kesehatan.' })
    const second = buildAbbyKnowledgeContext({ message: 'Saya ingin mengundang dr Ferdi sebagai narasumber seminar AI kesehatan.' })

    expect(first.metadata.selectedDocumentIds).toContain('speaking_profile')
    expect(first.metadata.selectedDocumentIds).toEqual(second.metadata.selectedDocumentIds)
  })

  it('selects collaboration/contact content for partnership intent', () => {
    const result = buildAbbyKnowledgeContext({ message: 'Bagaimana cara kontak untuk kerja sama dan kolaborasi institusional?' })

    expect(result.metadata.selectedDocumentIds).toContain('contact_collaboration')
  })
})
