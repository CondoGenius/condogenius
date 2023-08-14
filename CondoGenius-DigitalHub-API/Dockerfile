FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius-DigitalHub-API/CondoGenius-DigitalHub-API.csproj", "CondoGenius-DigitalHub-API/"]
RUN dotnet restore "CondoGenius-DigitalHub-API/CondoGenius-DigitalHub-API.csproj"
COPY . .
WORKDIR "/src/CondoGenius-DigitalHub-API"
RUN dotnet build "CondoGenius-DigitalHub-API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius-DigitalHub-API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius-DigitalHub-API.dll"]
