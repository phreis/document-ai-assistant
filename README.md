# document-ai-assistant

Dieser Proof of Concept (PoC) erprobt, wie ein lokaler KI-Assistent Fragen zu
eigenen Dokumenten beantworten kann. Das Node.js-Programm liest Textdateien aus
`documents/` ein und nimmt Fragen über das Terminal entgegen. Es sucht per
Stichwortsuche nach passenden Textabschnitten und übergibt sie zusammen mit der
Frage an das lokal laufende Ollama-Modell.

**Work in Progress:** Der PoC ist noch in Entwicklung. Derzeit werden nur
`.txt`-Dateien unterstützt.
