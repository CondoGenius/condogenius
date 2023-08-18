FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

WORKDIR /src
COPY . .

RUN dotnet restore CondoGenius-API-Gateway.csproj
RUN dotnet publish CondoGenius-API-Gateway.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-API-Gateway.dll"]