# Aurora Launcher — análise de portabilidade ARM64

## Objetivo
Adicionar suporte ARM64 ao Aurora Launcher sem remover o suporte ARM32 (armeabi-v7a), sem trocar a identidade do aplicativo e sem publicar uma versão instável.

## Estado confirmado no Aurora
- A branch de trabalho é `aurora-branding`.
- O aplicativo carrega `GTASA` e `samp` na classe `com.touch.mobile.dark.MainGTA`.
- O `android/app/build.gradle` restringe atualmente o pacote a `armeabi-v7a`.
- As bibliotecas nativas existentes do Aurora estão somente em `android/app/src/main/jniLibs/armeabi-v7a/`: `libGTASA.so`, `libImmEmulatorJ.so`, `libSCAnd.so`, `libbass.so` e `libsamp.so`.
- O Aurora usa `WarMedia` e a sua própria Activity/ponte Java. Portanto, incluir uma pasta ARM64 no Gradle, sem uma cadeia nativa compatível, não constitui portabilidade funcional.

## O que o ZIP de referência contém
- Bibliotecas `libGTASA.so`, `libSCAnd.so`, `libbass.so`, `libluajit-5.1.so` e `libmonetloader.so` para ARM64.
- O projeto de referência compila `libsamp.so` a partir de C++ com CMake para `armeabi-v7a` e `arm64-v8a`.
- O CMake desse projeto usa Opus e ShadowHook, além de BASS por ABI.
- O código Java de referência declara a Activity `GTASA` no pacote `com.nexion.online`; o código nativo também se integra à classe `SAMP` desse projeto.
- A biblioteca `libImmEmulatorJ.so` existe no ZIP apenas para ARM32. O carregamento dela é opcional no exemplo Java.

## Bloqueios de compatibilidade identificados
1. O `libsamp.so` do Aurora é um binário pré-compilado ARM32. O ZIP traz o código-fonte de outro módulo SA-MP, não um binário ARM64 intercambiável.
2. O módulo de referência depende de métodos e classes Java da aplicação de referência (incluindo `com.nexion.online.SAMP`), que não existem no Aurora.
3. O código de referência usa ShadowHook e Opus; essas dependências e suas configurações precisam ser integradas corretamente ao build do Aurora.
4. As bibliotecas `libGTASA.so` e demais binários do ZIP precisam ser validadas contra a versão dos arquivos de jogo e o conjunto de offsets/patches usado pelo Aurora. A semelhança dos nomes não prova compatibilidade.
5. O nome diferente de pacote Java, por si só, não é o único problema: chamadas JNI, métodos nativos, callbacks e ciclo de vida da Activity precisam corresponder exatamente.

## Próximas etapas técnicas
1. Mapear todas as chamadas JNI e métodos nativos esperados pelo código C++ de referência.
2. Comparar a Activity `MainGTA` e a implementação `WarMedia` do Aurora com as classes `GTASA`/`SAMP` da referência.
3. Verificar versão/arquitetura e dependências de cada biblioteca nativa com ferramentas ELF/NDK.
4. Adaptar a ponte Java do Aurora apenas após fechar o mapa de callbacks e dependências.
5. Compilar primeiro um APK de teste multi-ABI e verificar o conteúdo do APK (ARM32 e ARM64).
6. Testar inicialização e conexão SA-MP em dispositivo ARM64 antes de considerar o suporte concluído.

## Regra de segurança
Até que as etapas acima sejam validadas, manter `abiFilters 'armeabi-v7a'` no Aurora. Não copiar as bibliotecas ARM64 do ZIP diretamente para o aplicativo final e não remover o suporte ARM32. A referência deve ser tratada como código de terceiros; revisar licença e autorização de uso antes de incorporar ou redistribuir seus arquivos.
