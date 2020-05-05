### Structure

```javascript 
{
    "type": "Feature",
    "properties": {
      "gid": "25f7e5e5-92c3-4772-a497-baee4b30eaa4",
      "a1": 79,
      "a2": -3.0384
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        13.003062,
        50.016176
      ]
    }
} 
```

### Generator

See https://www.json-generator.com/

```javascript 
{
  "type": "FeatureCollection",
  "features": [
    '{{repeat(10000)}}',
    {
      type: "Feature",
      properties: {
        gid: '{{guid()}}',
        a1: '{{integer(0, 100)}}',
        a2: '{{floating(-10, 10)}}'
      },
      geometry: {
        type: 'Point',
        coordinates: ['{{floating(13.000001, 16.000001)}}', '{{floating(49.000001,52.000001)}}']
      }
    }
  ]
}
```