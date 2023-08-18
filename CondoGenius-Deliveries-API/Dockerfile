FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 5001
ENV ASPNETCORE_URLS=http://+:5001

WORKDIR /src
COPY . .

RUN dotnet restore CondoGenius-Deliveries-API.csproj
RUN dotnet publish CondoGenius-Deliveries-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Deliveries-API.dll"]