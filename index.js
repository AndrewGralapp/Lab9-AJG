// location of Halsey Science Center: 44.02851, -88.55108
const LATITUDE = 44.02851;
const LONGITUDE = -88.55108;

async function main() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&temperature_unit=fahrenheit&wind_speed_unit=mph&current=temperature_2m,cloud_cover,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m`);
        const data = await response.json();

        let status;

        if (data.current.temperature_2m < 32) {
            status = 'Below freezing';
        } else if (data.current.temperature_2m == 32) {
            status = 'Freezing';
        } else {
            status = 'Above freezing';
        }

        console.log(`Temperature: ${data.current.temperature_2m}°F, ${status}`);

        if (data.cloud_cover <= 5) {
            status = 'Clear';
        } else if (data.current.cloud_cover <= 25) {
            status = 'Few';
        } else if (data.current.cloud_cover <= 50) {
            status = 'Scattered';
        } else if (data.current.cloud_cover <= 87) {
            status = 'Broken';
        } else {
            status = 'Overcast';
        }

        console.log(`Cloud Cover: ${data.current.cloud_cover}%, ${status}`);

        let highWind = data.current.wind_speed_180m + data.current.wind_speed_120m;
        let lowWind = data.current.wind_speed_80m + data.current.wind_speed_10m;
        let windSpeed = Math.round((highWind + lowWind) / 4);

        if (highWind > lowWind) {
            status = 'Windier highter';
        } else if (lowWind > highWind) {
            status = 'Windier lower';
        } else {
            status = 'Mixed wind behavior';
        }

        console.log(`Wind Behavior: ${windSpeed}mph, ${status}`);
    } catch {
        console.log('Fetch failed');
    }
    
}

main();