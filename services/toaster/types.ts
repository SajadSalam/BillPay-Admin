export type ToasterColors = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted'

export interface ToasterProps {
    message: string
    title?: string
    icon?: string
    color?: ToasterColors
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}