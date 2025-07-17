export const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Days remaining until the payment date
export const daysRamain = (paymentDate: string) => {
    const date = new Date(paymentDate)
    const today = new Date()
    const diffTime = Math.abs(date.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}