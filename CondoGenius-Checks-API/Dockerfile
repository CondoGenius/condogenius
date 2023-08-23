﻿FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7005
ENV ASPNETCORE_URLS=http://+:7005

WORKDIR /src
COPY . .

RUN dotnet restore CondoGenius-Checks-API.csproj
RUN dotnet publish CondoGenius-Checks-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Checks-API.dll"]