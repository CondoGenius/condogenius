FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius/CondoGenius.csproj", "CondoGenius/"]
RUN dotnet restore "CondoGenius/CondoGenius.csproj"
COPY . .
WORKDIR "/src/CondoGenius"
RUN dotnet build "CondoGenius.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius.dll"]
