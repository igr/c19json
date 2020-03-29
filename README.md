# COVID-19.json for Serbia

![RepoUpdater](https://github.com/igr/c19json/workflows/RepoUpdater/badge.svg)

Preformatirani **ZVANIČNI** otvoreni podaci u `JSON` formatu.

> PODACI SE AUTOMATSKI OSVEŽAVAJU SVAKI SAT.

## 🟢 Potvrđeni slučajevi, dnevni trend, samoizolacija / po danima / regioni i sumarno

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


## 🙏 Hvala

Hajde da održavamo bazu otvorenih setova podataka u smislenoj strukturi i mašinski čitljivijem formatu.

Licenca: BSD 2-Clause License
