FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 5003
ENV ASPNETCORE_URLS=http://+:5003

WORKDIR /src
COPY . .

RUN dotnet restore CondoGenius-DigitalHUB-API.csproj
RUN dotnet publish CondoGenius-DigitalHUB-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-DigitalHUB-API.dll"]