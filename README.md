# Configuración Base del Linux de Sommerfeld (🇪🇸).
> Esta es una Guia enfocada sobretodo en la instalación de la configuración de Linux por parte de Sommerfeld en laptops con sistema moderno UEFI, SSD NVMe y Windows 11.

> Esta guía explica como instalar un dualboot con:
- CachyOS (Personalizado)
- Windows 11 (Base)

# ¿Por qué esta configuración de Cachy y Windows?
> Windows es un sistema con muchas herramientas de creación como Adobe, juegos modernos, servicios de Ofimática bastante completos, y es un sistema "fácil" de utilizar.

> Linux en cambio, es muy personalizable, sacrificando compatibilidad con aplicaciones y amabilidad con el usuario, es un sistema más robusto y complejo, pero mucho más versátil y flexible.

## Requisitos (hardware).
- CPU AMD o INTEL preferiblemente versiones recientes.
- 8GB DE RAM (MÍNIMO 4GB)
- SSD SATA/NVMe de mínimo 100GB (500GB recomendado).
- USB flasheable de 8GB de espacio mínimo.

## Descarga la imagen Linux de CachyOS.
> Para descargar CachyOS puedes hacerlo desde:
https://cachyos.org/

> Puedes utilizar cualquier distribución con soporte de Hyprland, pero yo personalmente uso CachyOS por su optimizacion.

## Descarga Rufus o Ventoy.
> Yo personalmente utilizo Rufus para flashear USB, pero si te gusta ventoy por su capacidad de almacenar varias .ISO no hay ningún problema.

> Puedes descargar Rufus desde:

> https://rufus.ie/es/

> Puedes descargar Ventoy desde:

> https://www.ventoy.net/en/index.html

## Flashear la USB (Rufus)
> Antes debes verificar si tu disco usa GPT o MBR, normalmente, los sistemas UEFI usan GPT.

- Abre Rufus y conecta la USB, Rufus lo detecta automáticamente.
- Selecciona la imagen .ISO o el archivo .rar de CachyOS en Boot Selection.
- Persistent Partition puedes dejarlo en 0GB si quieres.
- asegúrate que Partition Scheme y Target System Sea GPT.
- Aquí puedes presionar Start y dejar lo demás en Default.

> Imagen de Ejemplo:


! (https://rufus.ie/pics/screenshot1_es.png)
