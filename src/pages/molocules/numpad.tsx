import Button from "../atoms/button";

export default function Numpad({onButtonClick}: {onButtonClick: (value:string) => void}) {
    return (
        <>
            <div className="row-board">
                <Button value="+" Onclick={onButtonClick}/>
                <Button value="-" Onclick={onButtonClick}/>
                <Button value="*" Onclick={onButtonClick}/>
                <Button value="=" Onclick={onButtonClick}/>
            </div>
            <div className="row-board">                                                                                                                                                                                                                                                                
                <Button value="7" Onclick={onButtonClick}/>
                <Button value="8" Onclick={onButtonClick}/>
                <Button value="9" Onclick={onButtonClick}/>
                <Button value="/" Onclick={onButtonClick}/>
            </div>
            <div className="row-board">
                <Button value="4" Onclick={onButtonClick}/>
                <Button value="5" Onclick={onButtonClick}/>
                <Button value="6" Onclick={onButtonClick}/>
                <button disabled></button>
            </div>
            <div className="row-board">
                <Button value="1" Onclick={onButtonClick}/>
                <Button value="2" Onclick={onButtonClick}/>
                <Button value="3" Onclick={onButtonClick}/>
                <button disabled></button>
            </div>
            <div className="row-board">
                <Button value="0" Onclick={onButtonClick}/>
                <Button value="C" Onclick={onButtonClick}/>
                <Button value="←" Onclick={onButtonClick}/>
                <button disabled></button>
            </div>
        </>
    )
}