FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /src
COPY ["CondoGenius-Auth-Domain/", "../CondoGenius-Auth-Domain/"]
COPY ["CondoGenius-Auth-Repository/", "../CondoGenius-Auth-Repository/"]
COPY ["CondoGenius-Auth-Shared/", "../CondoGenius-Auth-Shared/"]
COPY ["Global.Shared/", "../Global.Shared/"]
COPY ["CondoGenius-API-Gateway/SQLs", "."]
COPY ["CondoGenius-API-Gateway/", "."]

RUN dotnet restore CondoGenius-API-Gateway.csproj
RUN dotnet publish CondoGenius-API-Gateway.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-API-Gateway.dll"]
