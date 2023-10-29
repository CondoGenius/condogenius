FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 9000
ENV ASPNETCORE_URLS=http://+:9000
ENV TZ=America/Sao_Paulo

WORKDIR /src
COPY ["CondoGenius-SendNotifications/", "."]
COPY ["condogenius-firebaseadmin-key.json", "../condogenius-firebaseadmin-key.json"]
COPY ["CondoGenius-Checks-Domain/", "../CondoGenius-Checks-Domain/"]
COPY ["CondoGenius-Checks-Infra/", "../CondoGenius-Checks-Infra/"]
COPY ["CondoGenius-Checks-API/SQLs", "./SQLs"]
COPY ["Global.Shared/", "../Global.Shared/"]

RUN dotnet restore CondoGenius-SendNotifications.csproj
RUN dotnet publish CondoGenius-SendNotifications.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-SendNotifications.dll"]