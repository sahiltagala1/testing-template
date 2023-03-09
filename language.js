const messages = {
  en: {
    breachType: (val) => `Breach-Type: ${val}`,
    warningType: (val) => `Warning-Type: ${val}`,
    normal: "is Normal",
    low: "LOW",
    high: "HIGH",
    temperature: "Temperature",
    soc: "State of Charge",
    chargeRate: "Charge rate",
  },
  ge: {
    breachType: (val) => `Verletzungstyp: ${val}`,
    warningType: (val) => `Warnungstyp: ${val}`,
    normal: "ist normal",
    low: "NIEDRIG",
    high: "HOCH",
    temperature: "Temperatur",
    soc: "Ladezustand",
    chargeRate: "Ladegeschwindigkeit",
  },
  hi: {
    breachType: (val) => `ब्रीच-टाइप: ${val}`,
    warningType: (val) => `चेतावनी-प्रकार: ${val}`,
    normal: "सामान्य है",
    low: "कम",
    high: "उच्च",
    temperature: "तापमान",
    soc: "चार्ज स्थिति",
    chargeRate: "चार्ज दर",
  },
  fr: {
    breachType: (val) => `Type de violation: ${val}`,
    warningType: (val) => `Type d'avertissement: ${val}`,
    normal: "Est normal",
    low: "FAIBLE",
    high: "HAUT",
    temperature: "Température",
    soc: "État de charge",
    chargeRate: "Taux de charge",
  },
  kn: {
    breachType: (val) => `ಉಲ್ಲಂಘನೆ-ಪ್ರಕಾರ: ${val}`,
    warningType: (val) => `ಎಚ್ಚರಿಕೆ-ಪ್ರಕಾರ: ${val}`,
    normal: "ಸಾಮಾನ್ಯವಾಗಿದೆ",
    low: "ಕಡಿಮೆ",
    high: "ಹೆಚ್ಚಿನ",
    temperature: "ತಾಪಮಾನ",
    soc: "ರಿಚರ್ಜ್ ಸ್ಥಿತಿ",
    chargeRate: "ರಿಚರ್ಜ್ ದರ",
  },
};
const lang= 'en';

module.exports=messages[lang];