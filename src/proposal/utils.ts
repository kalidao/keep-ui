export const prettierStatus = (status: 'pending' | 'process' | 'process_yes' | 'process_no' | 'executed') => {
    switch (status) {
        case 'pending':
            return 'Pending'
        case 'process':
            return 'Process'
        case 'process_yes':
            return 'Process Yes'
        case 'process_no':
            return 'Process No'
        case 'executed':
            return 'Executed'
        default:
            return 'Unknown'
    }
}

type Tone = 'accent' | 'blue' | 'green' | 'secondary' | 'red' | 'orange' | 'purple' | 'pink' | 'violet'

export const prettierStatusColor = (status: 'pending' | 'process' | 'process_yes' | 'process_no' | 'executed'): Tone  => {
    switch (status) {
        case 'pending':
            return 'orange'
        case 'process':
            return 'blue'
        case 'process_yes':
            return 'green'  
        case 'process_no':
            return 'red'
        case 'executed':
            return 'violet'
        default:
            return 'secondary'
    }
}