import Button from "../atoms/button";

export default function Board({onclick}:{onclick: () => string}) {
    return (
        <>
            <div className="row-board">
                <Button value="+" Onclick={onclick}/>
                <Button value="-" Onclick={onclick}/>
                <Button value="*" Onclick={onclick}/>
            </div>
            <div className="row-board">
                <Button value="1" Onclick={onclick}/>
                <Button value="2" Onclick={onclick}/>
                <Button value="3" Onclick={onclick}/>
            </div>
            <div className="row-board">
                <Button value="4" Onclick={onclick}/>
                <Button value="5" Onclick={onclick}/>
                <Button value="6" Onclick={onclick}/>
            </div>
            <div className="row-board">
                <Button value="7" Onclick={onclick}/>
                <Button value="8" Onclick={onclick}/>
                <Button value="9" Onclick={onclick}/>
            </div>
        </>
    )
}