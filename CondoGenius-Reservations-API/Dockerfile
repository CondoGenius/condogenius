FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7006
ENV ASPNETCORE_URLS=http://+:7006

WORKDIR /src
COPY ["CondoGenius-Reservations-Domain/", "../CondoGenius-Reservations-Domain/"]
COPY ["CondoGenius-Reservations-Infra/", "../CondoGenius-Reservations-Infra/"]
COPY ["CondoGenius-Reservations-API/", "."]
COPY ["Global.Shared/", "../Global.Shared/"]


RUN dotnet restore CondoGenius-Reservations-API.csproj
RUN dotnet publish CondoGenius-Reservations-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Reservations-API.dll"]