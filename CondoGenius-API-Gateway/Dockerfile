FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://*:5000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius-API-Gateway/CondoGenius-API-Gateway.csproj", "CondoGenius-API-Gateway/"]
RUN dotnet restore "CondoGenius-API-Gateway/CondoGenius-API-Gateway.csproj"
COPY . .
WORKDIR "/src/CondoGenius-API-Gateway"
RUN dotnet build "CondoGenius-API-Gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius-API-Gateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius-API-Gateway.dll"]
