FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine

WORKDIR /src
COPY ["CondoGenius-SendNotifications/", "."]
COPY ["condogenius-firebaseadmin-key.json", "../condogenius-firebaseadmin-key.json"]

RUN dotnet restore CondoGenius-SendNotifications.csproj
RUN dotnet publish CondoGenius-SendNotifications.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-SendNotifications.dll"]