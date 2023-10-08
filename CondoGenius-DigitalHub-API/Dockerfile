FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7004
ENV ASPNETCORE_URLS=http://+:7004

WORKDIR /src
COPY ["CondoGenius-DigitalHub-Domain/", "../CondoGenius-DigitalHub-Domain/"]
COPY ["CondoGenius-DigitalHub-Infra/", "../CondoGenius-DigitalHub-Infra/"]
COPY ["CondoGenius-DigitalHub-API/", "."]

RUN dotnet restore CondoGenius-DigitalHub-API.csproj
RUN dotnet publish CondoGenius-DigitalHub-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-DigitalHub-API.dll"]