export const formatDay = (paymentDate: string) => {
    const date = new Date(paymentDate)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}