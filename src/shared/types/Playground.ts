export interface IPlayground {
    id: string | null
    name: string
    type: "code" | "table" | "source" | null
    open: boolean
    data: any
    text?: string
}