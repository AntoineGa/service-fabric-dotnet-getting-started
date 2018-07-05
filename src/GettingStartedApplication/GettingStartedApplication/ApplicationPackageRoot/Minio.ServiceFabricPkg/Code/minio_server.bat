@ECHO OFF
SETLOCAL
	SET "MINIO_ACCESS_KEY=70516EBEGH8CLR4RZ4FQ"
	SET "MINIO_SECRET_KEY=KzDGBcqqmPB36p1Uj2s7boUNMvlpX87VKIFIXgPX"
	:: Make sure the --address port and Endpoint port in ServiceManifest.xml are the same
	CALL minio server --config-dir C:\Minio\ C:\Minio\Data
ENDLOCAL