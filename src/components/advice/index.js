// import preact
import { h, render, Component, useEffect} from 'preact';
import style from './style_recs';

export default class Advice extends Component {
    render(props){
        let badWeather = ["snow","sleet","freezing","heavy","extreme","shower","thunderstorm"] //the possibilities of bad weather
        let goodWeather = ["clear","clouds","drizzle", "rain"] //the possibilies of good/viable weather to exercise in
        var clothing = []; //array of clothing advice
        var advice = []; //array of exercise advice
        var cond="";
        let alarm=false; //gives a sense of warning that weather is not optimal for exercising either due to weather or temperature
        if (props.cond){cond=(props.cond).toLowerCase();}

        if (badWeather.some(weather => cond.includes(weather))){
            //section off advice for bad weather
            if (((cond).includes("thunderstorm"))||((cond).includes("extreme"))||((cond).includes("freezing"))){
                advice.push("HIGH-RISK WEATHER");
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
            //section off advice for good/viable weather and give advice accordingly
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
                //give fair advice of the heat when it exceeds 30 degrees
                if (props.temp>30){
                    advice.push("But please be careful of the heat!"); 
                    clothing.pop();
                    clothing.push("Light, airy layers");
                    alarm=true;
                }
            }
            else if(props.temp < 15){
                advice.push("Layer up, it's a little chilly!");
                clothing.push("Comfy workout clothes");
                //give fair advice of the cold when it falls below 0 degrees
                if (props.temp<0){
                    advice.push("But please be careful in the cold!");
                    clothing.pop();
                    clothing.push("Insulating thermal layers");
                    alarm=true;
                }
            }
        }
        //atmospherical weather such as mist, fog, dust, etc.
        else {
            advice.push("LOW-VISIBILITY WEATHER")
            advice.push("Potentially very dangerous, do not exercise right now");
            alarm=true;
        }
        return (
            <div  class={style.forecastbox}>
                <header class={style.header}>
                    <h1 style={alarm ? "color: red;" : ""}>{advice[0]}</h1>
                </header>
                <div class = {style.text}>
                    <h4>For today's recommendation:</h4>
                    {clothing.length != 0 ? 
                    <ul>
                        <li>{clothing[0]}</li>
                        <li>{clothing[1]}</li>
                    </ul> 
                    : null}
                    {advice.length == 3 ? <p style ={alarm ? "color: red;" : ""}>{advice[1]}<br />{advice[2]}</p> : <p style={alarm ? "color: orangered;" : ""}>{advice[1]}<br />{advice[3]}</p>}
                </div>
            </div>
        );
    }
}