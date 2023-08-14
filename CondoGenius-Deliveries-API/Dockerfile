FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius-Deliveries-API/CondoGenius-Deliveries-API.csproj", "CondoGenius-Deliveries-API/"]
RUN dotnet restore "CondoGenius-Deliveries-API/CondoGenius-Deliveries-API.csproj"
COPY . .
WORKDIR "/src/CondoGenius-Deliveries-API"
RUN dotnet build "CondoGenius-Deliveries-API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius-Deliveries-API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius-Deliveries-API.dll"]
