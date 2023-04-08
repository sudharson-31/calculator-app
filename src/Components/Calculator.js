import { useState,useEffect } from "react";
let expression = ""
export default function Calculator() {
    const [theme, setTheme] = useState(1);
    const App = document.getElementById("root");
    const [dsAnswer, setDsAnswer] = useState("0");
    useEffect(()=>{
        App.style.backgroundColor = "hsl(222, 26%, 31%)";
    },[])
    
    function createExpression(e){
        if(e===-1){
            expression = expression.slice(0,e);
        }else{
            if(e.target.innerText==="X"){
                expression+="*"
            }else{
                expression += e.target.innerText;
            }
        }
        

        setDsAnswer(expression)
    }
    function switcher() {

        setTheme((prevState) => {
            prevState = prevState + 1;
            return prevState % 3;
        })
        const knob = document.getElementById("knob");
        if (theme === 0) {
            App.classList.remove("mode2");
            App.classList.remove("mode3");
            App.classList.add("mode1");
            App.style.backgroundColor = "hsl(222, 26%, 31%)";
            knob.style.marginLeft = '0%';
        }
        else if (theme === 1) {
            App.classList.remove("mode1");
            App.classList.remove("mode3");
            App.classList.add("mode2");
            App.style.backgroundColor = "hsl(0, 0%, 90%)";
            knob.style.marginLeft = '35%';
        }
        else {
            App.classList.remove("mode1");
            App.classList.remove("mode2");
            App.classList.add("mode3");
            App.style.backgroundColor = "hsl(268, 75%, 9%)";
            knob.style.marginLeft = '70%';
        }


    }
    function calculate(){
        
        if(validateExpression()){
            let arr =[]
            let ans=0;
            if(expression.includes("-")){
                arr= expression.split("-");
                ans = (Number(arr[0])-Number(arr[1]));
                ans = ans.toPrecision(3);
               
            }
            if(expression.includes("+")){
                arr= expression.split("+");
                ans = (Number(arr[0])+Number(arr[1]));
                
            }
            if(expression.includes("/")){
                arr= expression.split("/");
                ans = (Number(arr[0])/Number(arr[1]));
                ans = ans.toPrecision(3);

            }
            if(expression.includes("*")){
                arr= expression.split("*");

                ans = (Number(arr[0])*Number(arr[1]));

            }
            setDsAnswer(ans)
            expression = String(ans)
        }
        else{
            reset();
            alert("Please enter a valid expression")
            
        }
        
    }

    function validateExpression(){
        console.log(/(\d+)\s*?(\+|-|\*|\/)\s*(\d+)(\s*?(\+|-|\*|\/)\s*(\d+))*/.test(expression))
         return(/(\d+)\s*?(\+|-|\*|\/)\s*(\d+)(\s*?(\+|-|\*|\/)\s*(\d+))*/.test(expression) )
    }
    function reset(){
        expression = ""
        setDsAnswer("0")
    }
    return (
        <div className="Calculator" id="Calculator">
            <div className="C-Header">
                <span className="C-H-Title">
                    calc
                </span>
                <span className="C-H-ThemeSwitcher">
                   <span className="title">THEME</span> 
                   <div className="toggle-button-cover">
                    <div className="button-cover">
                        <span className="C-H-TS-Modes">1 2 3</span>
                            <div className="button r" id="button-1">
                                <button className="switcher-button" onClick={switcher} name={"Theme"} />
                                <div className="knobs" id="knob"></div>
                                <div className="layer"></div>
                            </div>
                    </div>
                    </div>
                </span>
            </div>
            <div className="C-Display">
                     <span className="C-D-Answer">{dsAnswer}</span>   
            </div>
            <div className="C-Controls">
                <div className="C-Controls-1">
                    <span className="C-C-B B1 BN" onClick={e=>createExpression(e)}>1</span>
                    <span className="C-C-B B2 BN" onClick={createExpression}>2</span>
                    <span className="C-C-B B3 BN" onClick={createExpression}>3</span>
                    <span className="C-C-B B4 BN" onClick={createExpression}>4</span>
                    <span className="C-C-B B5 BN" onClick={createExpression}>5</span>
                    <span className="C-C-B B6 BN" onClick={createExpression}>6</span>
                    <span className="C-C-B B7 BN" onClick={createExpression}>7</span>
                    <span className="C-C-B B8 BN" onClick={createExpression}>8</span>
                    <span className="C-C-B B9 BN" onClick={createExpression}>9</span>
                    <span className="C-C-B B0 BN" onClick={createExpression}>0</span>
                    <span className="C-C-B Bdeci BN" onClick={createExpression}>.</span>
                    <span className="C-C-B Bdiv BN" onClick={createExpression}>/</span>
                    <span className="C-C-B Bmul BN" onClick={createExpression}>X</span>
                    <span className="C-C-B Badd BN" onClick={createExpression}>+</span>
                    <span className="C-C-B Bminus BN" onClick={createExpression}>-</span>
                    <span className="C-C-B Bdel BN" onClick={e=>createExpression(-1)}>DEL</span>
                </div>
                
                <div className="C-C-B2 C-Controls-2">
                <span className="C-C-B BA Bequal" onClick={calculate}>=</span>
                <span className="C-C-B BB Bclear" onClick={reset}>RESET</span>
                </div>

            </div>

        </div>
    )
}