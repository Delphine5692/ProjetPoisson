let scriptEle = document.createElement("script");
scriptEle.setAttribute("src", "https://code.jquery.com/jquery-3.7.1.slim.min.js");


function string_between_strings(startStr, endStr, str) {
    pos = str.indexOf(startStr) + startStr.length;
    return str.substring(pos, str.indexOf(endStr, pos));
}

var poisson = [];

var list = $(".article li")

for(var i = 0; i < list.length; i++)
{
    var line = list[i];

    var nom_scientifique = $(line).find("span").text();
    var nom_commom       = $(line).find("small a.marinade").text();
    var niveau           = "";
    var taille           = "";
    var volume           = "";
    var PH               = "";
    var GH               = "";
    var temperature      = "";

    var text             = $(line).find("small").text();
      

    if(text.includes(nom_commom))
    {
        text = text.replace(nom_commom,"");
    }

    if(text.includes("expert"))
    {
        niveau = "expert";
        text = text.replace("expert","");
    }

    if(text.includes("débutant"))
    {
        niveau = "débutant";
        text = text.replace("débutant","");
    }

    if(text.includes("cm"))
    {
        taille = text.split("cm")[0].trim();
        text   = text.replace(taille,"");
        text   = text.replace("cm","");
    }

    if(text.includes("L)"))
    {
        volume = text.split("L)")[0].trim();
        text   = text.replace(volume,"");
        text   = text.replace("L)","");
        volume = volume.replace("(>","").trim();
    }

    if(text.includes("pH"))
    {
        PH   = text.split("|")[0].trim();
        text = text.replace(PH,"").trim();
        PH   = PH.replace("pH","").trim();

    }

    if(text.includes("GH"))
    {
        GH = string_between_strings("GH","|",text);

        GH = GH.trim();
    }

    if(text.includes("°C"))
    {
        temperature = string_between_strings(" | ","°C",text);
        temperature = temperature.trim();
    }


    var  item = {};
    item["nom_scientifique"] = nom_scientifique;
    item["nom_commom"] = nom_commom;
    item["niveau"] = niveau;

    if(taille.length> 0)
    {
        item["taille_min"] = taille.split(" à ")[0].trim();
        item["taille_max"] = taille.split(" à ")[1].trim();
    }

    item["volume"] = volume;

    if(PH.length > 0)
    {
        item["PH_min"] = PH.split("–")[0];
        item["PH_max"] = PH.split("–")[1];
    }


    if(GH.length > 0)
    {
        item["GH_min"] = GH.split("–")[0];
        item["GH_max"] = GH.split("–")[1];
    }

    if(temperature.length > 0)
    {
        item["temperature_min"] = temperature.split("–")[0];
        item["temperature_max"] = temperature.split("–")[1];
    }

    poisson.push(item);
}

//console.log(poisson);

var content = "";
for(var i =0; i < poisson.length; i++)
{
    content = content + poisson[i].nom_scientifique +"|"+ poisson[i].nom_commom +"|"+ poisson[i].niveau+"|"+ poisson[i].taille_min+"|"+ poisson[i].taille_max+"|"+ poisson[i].volume+"|"+ poisson[i].PH_min+"|"+ poisson[i].PH_max+"|"+ poisson[i].GH_min+"|"+ poisson[i].GH_max+"|"+ poisson[i].temperature_min+"|"+ poisson[i].temperature_max + "\n";
}

console.log(content);