<div align="center">
    <img src="/assets/images/png/shapegis-logo.png">
</div>

<h3 align="center"> 
Save time, save data. </h3> <br>

 <p align="center">
    <a href="#Proposta-para-Sprint-3">Proposta para Sprint 3</a> •
    <a href="#Entregas-da-Sprint">Entregas da Sprint</a> •
    <a href="#Demonstração">Demonstração</a> •
    <a href="#Modelo-de-Dados">Modelo de Dados</a> •
    <a href="#Tecnologias-utilizadas-na-Sprint">Tecnologias utilizadas na Sprint</a> •
    <a href="#Burndown">Burndown</a> •
 </p> 
 <br>

# Proposta para Sprint 3
<div align="center">
    <img src="/assets/images/png/cards-sprint3.png">
</div>

# Entregas da Sprint
 
* Upload de múltiplos formatos de arquivos Shapefile
* UI/UX: Alerta e não permite que o usuário conecte ao banco de dados caso um dos campos estiver vazio, upload mínimo de 3 arquivos das extensões .shp/.shx/.dbf
* Seleção de Banco de Dados
* Seleção de Tabela PostGIS
* Implementação da solução DE-PARA, para carga de Shapefiles ao Banco
* Carga do Shapefile para PostGIS
* [Documento de ambientação para execução da solução](https://github.com/BureauTech/Mini-ETL-Shapefile-to-PostGis/tree/sprint-3/docs/Documento_Ambientacao_ShapeGis.pdf)

# Demonstração

<div align="center">
    <img src="/assets/images/gif/demo-sprint-3.gif">
</div>

# Modelo de Dados

<div align="center">
    <img src="/assets/images/png/Diagrama_ERv2.png">
</div>

# Tecnologias utilizadas na Sprint

- React JS
- Context API
- Spring boot
- Java

# Burndown

<div align="center">
    <img src="/assets/images/png/burndown-sprint3.png">
</div>

Obs: A linha que representa o tempo restante (azul), fechou com valor negativo pois a equipe usou horas extras para a execução das atividades. Ou seja, apesar da equipe ter utilizado mais horas do que foi planejado, foi possível entregar as funcionalidades propostas.

### Análise do Burndown

O gráfico abaixo demonstra a análise dos prazos durante a Sprint 3:

<div align="center">
    <img width="500" src="/assets/images/png/analise_burndown_sprint3.png">
</div>

Quase metade das atividades foram entregues em atraso pelos seguintes motivos:

- Dificuldade em tecnologias e ferramentas para o desenvolvimento
- Integração de novos membros
- Ambientação: API retirada do Heroku e executada localmente
- Reestruturação do front
