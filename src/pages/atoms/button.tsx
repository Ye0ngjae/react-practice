
export default function Button({value, Onclick}: {value: string, Onclick: () => string}) {
    return (
        <button onClick={Onclick}>{value}</button>
    )
}