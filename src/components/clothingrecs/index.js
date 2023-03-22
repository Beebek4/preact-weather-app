// import preact
import { h, render, Component, useEffect} from 'preact';
import style from '../clothingrecs/style_recs';

export default class Clothing extends Component {
    render(props){
        let badWeather = ["snow","sleet","freezing","heavy","extreme","shower","thunderstorm"] //the possibilities of bad weather
        let goodWeather = ["clear","clouds","drizzle", "rain"] //the possibilies of good/viable weather to exercise in
        var clothing = []; //array of clothing advice
        var advice = []; //array of exercise advice
        var cond="";
        let alarm=false;
        if (props.cond){cond=(props.cond).toLowerCase();}

        if (badWeather.some(weather => cond.includes(weather))){
            //section off advice for bad weather
            if (((cond).includes("thunderstorm"))||((cond).includes("extreme"))||((cond).includes("freezing"))){
                advice.push("DANGEROUS WEATHER");
                advice.push("Do not partake in any outdoor sports right now!");
                alarm=true;
            }
            else if (((cond).includes("shower"))||((cond).includes("heavy"))){
                advice.push("WET WEATHER");
                advice.push("Steer clear of any exercise due to volatile terrain!");
                alarm=true;
            }
        }
        else if (goodWeather.some(weather => cond.includes(weather))){
            //section off advice for good/viable weather
            if ((cond).includes("drizzle")||(cond.includes("rain"))){
                advice.push("COME RAIN OR SHINE");
                advice.push("Perhaps take this opportunity for a light walk!");
                clothing.push("Waterproof shoes");
            }
            else if (((cond).includes("clear"))||((cond).includes("clouds"))){
                advice.push("TIME FOR SOME OUTDOOR SPORTS");
                advice.push("The weather is perfect to go outside!");
                clothing.push("Your best outfit!");
            }
            if (props.temp >=15){
                advice.push("The heat is bubbling!");
                clothing.push("Breathable gear");
                if (props.temp>30){
                    advice.push("Please be careful of the heat!");
                    clothing.pop();
                    clothing.push("Light, airy layers");
                    alarm=true;
                }
            }
            else if(props.temp < 15){
                advice.push("Layer up, it's a little chilly!");
                clothing.push("Comfy workout clothes");
                if (props.temp<0){
                    advice.push("Please be careful in the cold!");
                    clothing.pop();
                    clothing.push("Insulating thermal layers");
                    alarm=true;
                }
            }
        }
        else { //atmospherical weather such as mist, fog dust
            advice.push("LOW-VISIBILITY WEATHER")
            advice.push("Potentially very dangerous, do not exercise right now");
            alarm=true;
        }
        //props.cond == "Light rain" ? <div>Raining</div> :<div>Not raining</div>
        console.log(advice);
        console.log(clothing);
        return (
            <div  class={style.forecastbox}>
                <header class={style.header}>
                    <h1 style={alarm ? "color: red;" : ""}>{advice[0]}</h1>
                </header>
                <div class = {style.text}>
                    <h4>For today's recommendation:</h4>
                    {advice.length == 2 ? <p style ={alarm ? "color: red;" : ""}>{advice[1]}</p> : <p style={alarm ? "color: red;" : ""}>{advice[1]}<br />{advice[2]}</p>}
                    {clothing.length != 0 ? 
                    <ul>
                        <li>{clothing[0]}</li>
                        <li>{clothing[1]}</li>
                    </ul> 
                    : null}
                </div>
            </div>
        );
    }
}