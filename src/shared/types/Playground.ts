export interface IPlayground {
    id: string | null
    type: "code" | "table" | "source" | null
    open: boolean
    data: any
    text?: string
}