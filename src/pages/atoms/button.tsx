
export default function Button({value, Onclick}: {value: string, Onclick: (value:string) => void}) {
    return (
        <button onClick={() => Onclick(value)}>{value}</button>
    )
}