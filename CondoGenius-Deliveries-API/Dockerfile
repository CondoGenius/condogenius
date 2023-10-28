FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7003
ENV ASPNETCORE_URLS=http://+:7003

WORKDIR /src
COPY ["CondoGenius-Deliveries-Domain/", "../CondoGenius-Deliveries-Domain/"]
COPY ["CondoGenius-Deliveries-Infra/", "../CondoGenius-Deliveries-Infra/"]
COPY ["CondoGenius-Deliveries-API/", "."]
COPY ["Global.Shared/", "../Global.Shared/"]

RUN dotnet restore CondoGenius-Deliveries-API.csproj
RUN dotnet publish CondoGenius-Deliveries-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Deliveries-API.dll"]