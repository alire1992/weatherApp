// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto
export const BASE_URL_OPEN_METO = "https://api.open-meteo.com/v1/forecast?";
export const OPTIONS =
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto";
