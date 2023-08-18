FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7006
ENV ASPNETCORE_URLS=http://+:7006

WORKDIR /src
COPY . .

RUN dotnet restore CondoGenius-Reservations-API.csproj
RUN dotnet publish CondoGenius-Reservations-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Reservations-API.dll"]