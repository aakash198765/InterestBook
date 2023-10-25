
const resources = (type) => { 

    let resources = {
        en: {
            translations: require("./locales/en/translation.json")
        },
        hi: {
            translations: require("./locales/hi/translation.json")
        }
    }

    let languages = [
        {
            key: "en",
            label: "English (en)"

        },
        {
            key: "hi",
            label: "Hindi (hi)"
        }
    ]

   switch(type) {
    case "resources": 
        return resources;
    case "languages": 
        return languages;
   }
   return null;
}

export default resources;