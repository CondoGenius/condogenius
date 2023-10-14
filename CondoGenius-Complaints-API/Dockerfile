FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine
EXPOSE 7002
ENV ASPNETCORE_URLS=http://+:7002

WORKDIR /src
COPY ["CondoGenius-Complaints-Domain/", "../CondoGenius-Complaints-Domain/"]
COPY ["CondoGenius-Complaints-Infra/", "../CondoGenius-Complaints-Infra/"]
COPY ["CondoGenius-Complaints-API/", "."]
COPY ["Global.Shared/", "../Global.Shared/"]

RUN dotnet restore CondoGenius-Complaints-API.csproj
RUN dotnet publish CondoGenius-Complaints-API.csproj -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT ["dotnet", "CondoGenius-Complaints-API.dll"]