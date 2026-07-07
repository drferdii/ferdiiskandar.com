export type AbbyLeadPurpose =
  | 'speaking_invitation'
  | 'media_interview'
  | 'collaboration'
  | 'healthcare_ai_discussion'
  | 'partnership'
  | 'general_inquiry'

export type AbbyLeadPayload = {
  name: string
  email: string
  organization?: string
  purpose: AbbyLeadPurpose
  message: string
  consent: boolean
  visitorMode?: string
  conversationSummary?: string
  createdAt: string
}
