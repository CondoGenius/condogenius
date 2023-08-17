FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5001
ENV ASPNETCORE_URLS=http://*:5001

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CondoGenius-Complaints-API/CondoGenius-Complaints-API.csproj", "CondoGenius-Complaints-API/"]
RUN dotnet restore "CondoGenius-Complaints-API/CondoGenius-Complaints-API.csproj"
COPY . .
WORKDIR "/src/CondoGenius-Complaints-API"
RUN dotnet build "CondoGenius-Complaints-API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CondoGenius-Complaints-API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CondoGenius-Complaints-API.dll"]
