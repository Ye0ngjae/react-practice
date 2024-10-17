import { useState } from "react";
import Numpad from "../molocules/numpad";

export default function Calculator() {
    const [expression, setExpression] = useState<string[]>(["0"]);
    const [result, setResult] = useState<boolean>(false);

    // array에 값을 추가하는 함수
    function arrayPush(value: string){

        if (value === "=") {
            const result = calculate(expression);
            setExpression([result.toString()]);
            setResult(true);
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
            if (expression[0] === "0" || result) {
                expression.shift();
                setResult(false);
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
class TreeNode {
    value: number | string;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number | string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function calculate(expression: string[]): string {
    const tokens = tokenize(expression);
    const postfix = infixToPostfix(tokens);
    const tree = buildExpressionTree(postfix);
    const result = evaluateExpressionTree(tree);
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

function infixToPostfix(tokens: (number | string)[]): (number | string)[] {
    const precedence: { [key: string]: number } = { 
        '+': 1, 
        '-': 1, 
        '*': 2, 
        '/': 2,
        "%": 2
    };
    const output: (number | string)[] = [];
    const operatorStack: string[] = [];

    for (const token of tokens) {
        if (typeof token === 'number') {
            output.push(token);
        } else if (token in precedence) {
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] in precedence &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token as string]
            ) {
                output.push(operatorStack.pop()!);
            }
            operatorStack.push(token as string);
        }
    }

    while (operatorStack.length > 0) {
        output.push(operatorStack.pop()!);
    }

    return output;
}

function buildExpressionTree(postfix: (number | string)[]): TreeNode {
    const stack: TreeNode[] = [];

    for (const token of postfix) {
        if (typeof token === 'number') {
            stack.push(new TreeNode(token));
        } else {
            const right = stack.pop()!;
            const left = stack.pop()!;
            const node = new TreeNode(token);
            node.left = left;
            node.right = right;
            stack.push(node);
        }
    }

    return stack[0];
}

function evaluateExpressionTree(node: TreeNode): number {
    if (typeof node.value === 'number') {
        return node.value;
    }

    const left = evaluateExpressionTree(node.left!);
    const right = evaluateExpressionTree(node.right!);

    switch (node.value) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/':
            if (right === 0) throw new Error("Division by zero");
            return left / right;
        case "%":return left % right;
        default:
            throw new Error(`Unknown operator: ${node.value}`);
    }
}
