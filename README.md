# COVID-19.json for Serbia

![](https://github.com/igr/c19json/workflows/RepoUpdater/badge.svg)

Preformatirani **ZVANIČNI** otvoreni podaci u `JSON` formatu.

> PODACI SE AUTOMATSKI OSVEŽAVAJU SVAKI SAT.

## 🟢 Potvrđeni slučajevi, dnevni trend, samoizolacija / po danima / regioni i sumarno

📖 **IZVOR**: https://covid19.data.gov.rs

```json
{
    "date": "<datum kreiranja fajla>",
    "serbia": [
        {
          "date": "2020-03-06",
          "confirmed": 1,
          "isolation": 3,
          "daily": 2,
        },
        ...
    ],
    "regions": {
    	"<ime regiona>": [
    		{
          		"date": "2020-03-06",
          		"confirmed": 7,
                "isolation": 5,
                "daily": 2,
        	},
        	...
    	]
	}
}

```

Vrednosti koje _ne postoje_ su obeležene sa `-1`.


🔗 LINK:

```
https://raw.githubusercontent.com/igr/c19json/master/covid19-rs.json
```

### https://raw.githubusercontent.com/igr/c19json/master/covid19-rs.json

[Celokupna istorija izmena](https://github.com/igr/c19json/commits/master/covid19-rs.json).


## 🟢 Potvrđeni, preminuli, oporavljeni / po danima

📖 **IZVOR**: https://github.com/CSSEGISandData/COVID-19

```json
{
    "date": "<datum kreiranja fajla>",
    "serbia": [
        {
          "date": "2020-03-06",
          "confirmed":1,
          "deaths":0,
          "recovered":0
        },
        ...
    ]
}

```

🔗 LINK:

```
https://raw.githubusercontent.com/igr/c19json/master/covid19-jhc.json
```

### https://raw.githubusercontent.com/igr/c19json/master/covid19-jhc.json



## 🙏 Hvala

Hajde da održavamo bazu otvorenih setova podataka u smislenoj strukturi i mašinski čitljivijem formatu.

Licenca: BSD 2-Clause License
