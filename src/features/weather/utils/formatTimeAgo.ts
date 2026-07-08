export function formatTimeAgo(timestamp: number, now: number):string {

    const minute = Math.floor((now - timestamp) / (1000 * 60))

    if(minute < 1){
        return 'Just now'
    }

    if(minute === 1){
        return `Updated ${minute} minute ago`
    }

    if(minute < 60){
        return `Updated ${minute} minutes ago`
    }

    const hour = Math.floor(minute / 60)

    if(hour === 1){
        return 'Updated 1 hour ago'
    }

    return `Updated ${hour} hours ago`

}