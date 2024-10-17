import { useState } from "react";
import Numpad from "../molocules/numpad";

export default function Calculator() {
    const [expression, setExpression] = useState<string[]>(["0"]);

    // array에 값을 추가하는 함수
    function arrayPush(value: string){

        if (value === "=") {
            const result = calculate(expression);
            setExpression([result.toString()]);
            return;
        } else if (value === "C") {
            setExpression(["0"]);
            return;
        } else if (value === "←") {
            if (expression.length === 1) {
                setExpression(["0"]);
            } else {
                setExpression(expression.slice(0, -1));
            }
            return;
        }

        if (expression.length <= 13){
            if (expression[0] === "0") {
                expression.shift();
            }
            setExpression([...expression, value]);
        }
        else {
            return;
        }
        
    }

    return (
        <>
            <div className="calculator">
                <h3 id="calculator-display">{expression.join("")}</h3>
                <Numpad onButtonClick={arrayPush}/>
            </div>
        </>
    )   
}

// array를 가지고 수식 트리를 만들어 계산 값을 return하는 함수
function calculate(expression: string[]): string {
    const tokens = tokenize(expression);
    const result = evaluateExpression(tokens);

    return result.toString();
}
function tokenize(expression: string[]): (number | string)[] {
    const tokens: (number | string)[] = [];
    let currentNumber = '';

    for (const token of expression) {
        if (!isNaN(Number(token))) {
            currentNumber += token;
        } else {
            if (currentNumber !== '') {
                tokens.push(Number(currentNumber));
                currentNumber = '';
            }
            tokens.push(token);
        }
    }

    if (currentNumber !== '') {
        tokens.push(Number(currentNumber));
    }

    return tokens;
}

function evaluateExpression(tokens: (number | string)[]): number {
    let result = tokens[0] as number;
    
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i] as string;
        const operand = tokens[i + 1] as number;
        
        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                if (operand === 0) throw new Error("Division by zero");
                result /= operand;
                break;
        }
    }

    return result;
}