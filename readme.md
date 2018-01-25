## avaliable APIs

| HTTP method | URI path                               | Description                            |
| :---------: | -------------------------------------- | -------------------------------------- |
|    `GET`    | `/houses `*                            | retrieves all houses                   |
|    `GET`    | `/average_price `*                     | retrieves average price in UK          |
|    `GET`    | `/postcode/:postcode/houses `**        | retrieves all houses in given postcode |
|    `GET`    | `/postcode/:postcode/average_price `** | retrieves average price in postcode    |
|    `GET`    | `/postcode/:postcode/coordinates `     | retrieves coordinates for postcode     |
|    `GET`    | `/town/:town/houses `**                | retrieves all houses in given town     |
|    `GET`    | `/town/:town/average_price `**         | retrieves average price in town        |
|    `GET`    | `/county/:county/houses `**            | retrieves all houses in given county   |
|    `GET`    | `/county/:county/average_price `**     | retrieves average price in county      |
|    `GET`    | `/district/:district/houses`**         | retrieves all houses in given district |
|    `GET`    | `/district/:district/average_price `** | retrieves average price in district    |
|    `GET`    | `/locality/:locality/houses `**        | retrieves all houses in given locality |
|    `GET`    | `/locality/:locality/average_price `** | retrieves average price in locality    |


`* available queries: ?property_type=(property_type), ?new_build=(new_build)`
`** available queries: ?street=(street_name), ?property_type=(property_type), ?new_build=(new_build)`

All parameters and query values have to be capital letters.

## Property Type Key

| Letter | Property Type   |
| ------ | --------------- |
| D      | Detached        |
| S      | Semi-detached   |
| T      | Terraced        |
| F      | Flat/Maisonette |


## New Building Key

| Letter | Property Type |
| ------ | ------------- |
| Y      | New           |
| N      | Not New       |
