FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius-Gateway/CondoGenius-Gateway.csproj", "CondoGenius-Gateway/"]
RUN dotnet restore "CondoGenius-Gateway/CondoGenius-Gateway.csproj"
COPY . .
WORKDIR "/src/CondoGenius-Gateway"
RUN dotnet build "CondoGenius-Gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius-Gateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius-Gateway.dll"]
