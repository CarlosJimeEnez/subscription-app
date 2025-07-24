
export interface Message {
    id: string;
    text: string;
    createdAt: Date;
    sender: 'user' | 'gemini';
    type: string;
}