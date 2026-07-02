import { TableIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export default function Empty({ emptyState }: { emptyState?: ReactNode }) {
    if (emptyState) {
        return (
            <tbody className='block w-full'>
                <tr className='flex w-full'>
                    <td className='w-full'>
                        <div className='flex items-center justify-center min-h-[160px] py-8 px-6'>
                            {emptyState}
                        </div>
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody className='block w-full'>
            <tr className='flex w-full'>
                <td className='w-full'>
                    <div className='flex flex-col items-center justify-center gap-3 min-h-[160px] py-8 text-login-300'>
                        <TableIcon className='h-10 w-10 opacity-30' />
                        <span className='text-sm'>No data found</span>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
