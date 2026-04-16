// location of Halsey Science Center: 44.02851, -88.55108
const LATITUDE = 44.02851;
const LONGITUDE = -88.55108;

async function main() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&temperature_unit=fahrenheit&wind_speed_unit=mph&current=temperature_2m,cloud_cover,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m`);
        const data = await response.json();

        console.log(data);
    } catch {
        console.log('Fetch failed');
    }
    
}

main();